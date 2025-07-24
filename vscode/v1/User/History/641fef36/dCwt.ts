export function getProfileImageUrl(username: string): string {
  return `https://robohash.org/${username}.png?size=200x200`;
}
