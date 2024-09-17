## Spec


### Keypad spec
I want a single web page that implements a spooky AI chat agent for guest's of a dracula themed murder mystery party. The actual chat interface will be implemented via a custom `<deep-chat>` web component. The app should work as follows:

1. The chat UI will be made to look like the surface of a magic mirror on the wall of a castle. This will be a background image.
2. A user (guest) will need to authenticate using a code entered into a popup of a code pad. The popup should overlay the chat mirror and only close when the correct sequence of three symbols are pressed. The popup will render using a 1024x1024 image (`keypad.webp`) I have, which has a 3x3 grid of symbols in the center. Each symbol should be pressable (ie. there should be a transparent button on top of it) and is 275x275 pixels. When pressed, there should be some kind of lightup effect, which I think could be some kind of semi-transparent CSS that will cause the underlying symbol in the base image to glow with a red light.
- `SYMBOLS = ['bat', 'cross', 'moon', 'rose', 'wolf', 'book', 'money', 'drop', 'pentagram']` (from top left to bottom right)
- There are 15 guests, each guest is given a unique three symbol code.
- Symbols can be entered in any order.
- Entering more than 3 symbols resets the code.

### Data Model Spec

I want a single web page that implements a spooky AI chat agent for guest's of a dracula themed murder mystery party. The actual chat interface will be implemented via a custom `<deep-chat>` web component. The app should work as follows.

1. There are two lists: `PUBLIC_SECRETS` and `PRIVATE_SECRETS`, each containing strings. These lists should be synced to `localStorage`, and should only be initialized from their default values (`DEFAULT_PUBLIC_SECRETS`, etc.) if there is no corresponding `localStorage` key.
2. A secret can be moved from public to private (but not the other way around).
3. The app has a list of users, represented by a `USERS` object mapping names to: `{code: ["login", "code", ...], conversations: [], public_secrets_seen: [3,19], last_conversation_ended_at: "2024-...", current_conversation: number | null, private_secrets_submitted: [10, 11]}`
   - `code` is always an array of three strings
   - `public_secrets_seen` is a list of indices 
   - `last_conversation_ended_at` is a date time string
   - `private_secrets_submitted` is a list of indices
   - `conversations` is a list of objects: `{message: "", at: "2024-...", from: "user" | "agent"}`
   - ALL CHANGES TO `USERS` MUST BE SYNCED TO `localStorage`, and `localStorage` should be used to initialize `USERS` if it is not present.
4. The app should have a `current_user` state variable that is set to the current user object.

## Conversations
- [Claude: Keypad](https://claude.ai/chat/b6d85984-e5fb-4422-9e68-ba65ea8fdbc8)


## Initialization Data
```js


```
