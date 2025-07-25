import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { UserType } from "@/app/utils/types";
import { createUser } from "@/app/utils/db";
import type { UserJSON } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  const { data } = payload;

  switch (eventType) {
    case "user.created":
      await OnUserCreation(data, id!);
      break;
    case "user.updated":
      console.log("User Updated");
      break;
    case "user.deleted":
      console.log("User Deleted");
      break;
    default:
      console.log("Unhandled event type: ", eventType);
  }

  return new Response("Webhook received", { status: 200 });
}

async function OnUserCreation(data: UserJSON, id: string) {
  const newUser: UserType = {
    userId: id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email_addresses[0].email_address,
    role: "user",
    imageUrl: data.image_url,
    createdAt: new Date(Number(data.created_at)).toISOString(),
  };
  await createUser(newUser);
}
