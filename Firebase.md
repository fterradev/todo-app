# Firebase setup

## Use the following commands

1. `npx firebase login`

2. `npx firebase init`

  And select the following options:

    1. Emulators: Set up local emulators for Firebase products
    2. Use an existing project
    3. todo-app-fcacd (todo-app)
    4. Authentication Emulator, Firestore Emulator
    5. ? Which port do you want to use for the auth emulator? (9099)
    6. ? Which port do you want to use for the firestore emulator? (8080)
    7. ? Would you like to enable the Emulator UI? Yes
    8. ? Which port do you want to use for the Emulator UI (leave empty to use any available port)? 
    9. ? Would you like to download the emulators now? Yes

3. `npx firebase emulators:start`
