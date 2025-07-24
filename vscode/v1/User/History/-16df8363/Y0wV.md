# 1. Getting List of Group Sessions (SM)

**endpoint** `api/group_sessions/`
**method** : GET
**auth** : true

```ts
{
  success: boolean; // Indicates whether the request was successful
  data: GroupSession[]; // An array of group session objects
}

// Group Session Structure
type GroupSession = {
  id: string; // Unique session ID
  title: string; // Session title
  description: string; // Brief description of the session
  durationInMinutes: number; // Duration in minutes
  startTime: string; // ISO string format of session start time
  mentor: {
    id: string; // Unique mentor ID
    name: string; // Mentor's name
    photoLink: string; // URL of the mentor's profile picture
  };
  participants: {
    current: number; // Number of participants currently registered
    max: number; // Maximum allowed participants
  };
};
```

# 2. Get Specific Group Session Information (SM)

endpoint : `api/group-sessions/{gsid}`
method : `GET`
auth : true

```ts
{
  success: boolean; // Indicates whether the request was successful
  data: GroupSession; // Single Group Session Object
}

// Group Session Structure
type GroupSession = {
  id: string; // Unique session ID
  title: string; // Session title
  description: string; // Brief description of the session
  durationInMinutes: number; // Duration in minutes
  startTime: string; // ISO string format of session start time
  mentor: {
    id: string; // Unique mentor ID
    name: string; // Mentor's name
    photoLink: string; // URL of the mentor's profile picture
  };
  participants: {
    current: number; // Number of participants currently registered
    max: number; // Maximum allowed participants
  };
};
```

# 3. Student joins a specific group session (S)

endpoint : `api/group-sessions/join`
method : `POST`
auth : true(student)

Request Body :

```ts
{
	GroupSessionId : string,
	ParticipantId : string,  // student id
}
```

Response Body :

```ts
{
  success: boolean;
  data: {
    meetingLink: string; // meeting Link of group session
  }
}
```

# 4. Participant Cancel Registration (S)

There should be a status field in GroupSessionParticipant Table. Status should be ENUM type of "registered", "cancelled", "completed", "waiting". When joining a participant, add that to the table and default value of status at adding participant is "registered" if and only if the current register count is less than the max limit. Otherwise status value should be waiting. When deleting a participant, just change the status to "cancelled".

endpoint : `api/group-sessions/cancelregistration`
method : POST
auth : true(student)
Request Body :

```ts
{
	GroupSessionId : string,
	ParticipantId : string,  // student id
}
```

Response Body :

```ts
{
  success: boolean; // Indicates whether the request was successful
}
```

# 5. Get List of Registered Participants of a Group Session (SM)

endpoint : `api/group-sessions/participantlist/{gsid}
method : **GET**
auth : true
**Response Body :**

```ts
{
  success: boolean; // Indicates whether the request was successful
  data : GroupSessionParticipantInfo[]
}

type GroupSessionParticipantInfo = {
  id: string; // Unique participant ID
  name: string; // Participant's name
  photoLink: string; // URL of the participant's profile picture
  joinedAt: string; // ISO string of when the participant joined the session
  status: "registered" | "cancelled" | "completed" | "waiting"; // Status of the participant in the session
};
```

# 6. Group Session Create (M)

endpoint : `api/group-sessions/create
method : **POST**
auth : true
**Request Body :**

```
{
	title : string
	description : string,
	durationInMinutes : number,
	startTime: string,
	mentorId : string,
	maxParticipant: number
}
```

**Response Body :**

```ts
{
  success: boolean;
  data : GroupSession (newly created group session information)
}

type GroupSession = {
  id: string; // Unique session ID
  title: string; // Session title
  description: string; // Brief description of the session
  durationInMinutes: number; // Duration in minutes
  startTime: string; // ISO string format of session start time
  mentor: {
    id: string; // Unique mentor ID
    name: string; // Mentor's name
    photoLink: string; // URL of the mentor's profile picture
  };
  participants: {
    current: number; // Number of participants currently registered
    max: number; // Maximum allowed participants
  };
};
```

# 7. Delete Group Session(M)

check if the authenticated mentor and the group session creator same or not before removing the group session.

endpoint : `api/group-sessions/delete
method : **DELETE**
auth : true
**Request Body :**

```
{
  GroupSessionId : String
}
```

**Response Body :**

```ts
{
  success: boolean;
  data : GroupSession (recently deleted group session information)
}

type GroupSes
sion = {
  id: string; // Unique session ID
  title: string; // Session title
  description: string; // Brief description of the session
  durationInMinutes: number; // Duration in minutes
  startTime: string; // ISO string format of session start time
  mentor: {
    id: string; // Unique mentor ID
    name: string; // Mentor's name
    photoLink: string; // URL of the mentor's profile picture
  };
  participants: {
    current: number; // Number of participants currently registered
    max: number; // Maximum allowed participants
  };
};
```
