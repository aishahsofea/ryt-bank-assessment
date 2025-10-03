## Design Decisions

1. State management is implemented with Zustand because it is lightweight and handles persistence with async storage seamlessly.
1. Modal presentation for routing because it is simple and provides an intuitive user journey.
1. The default dark/light theme that comes out of the box when the app is scaffolded has been removed, with only dark theme retained for simplicity.
1. Code for simulating API calls is included in the `/services` folder. This code is written to mimic backend behavior, using standard HTTP response codes. It also does not have access to frontend or client code.
1. Tanstack Query is used to manage data fetching, as it provides convenient features such as `isPending` that can be used to control how UI components (like buttons) behave when a transaction is in progress.
1. Haptic feedback is incorporated throughout the app to enhance UX. For example, clicking "Pay & Confirm" triggers heavy haptic feedback, indicating it is a significant action.
1. Reusable components are created inside the `/components` folder
1. Proper built-in React Native components are being used where appropriate. For example, `Flatlist` is used for rendering lists to ensure virtualization is in place.

## Challenges

1. It’s difficult to get the `KeyboardAwareScrollView` to work correctly - sometimes the keyboard would still cover the `TextInput`
1. Coming from a web background, I had to spend some time studying React Native and ensuring I applied best practices.
1. The code has more duplication than I would prefer, especially with styling as there is no concept of cascading. However, as long as it remains readable, this is acceptable given the app’s small size.
1. For some reason, real-time linting for unused styles (where red squiggly underlines appear) was not working. I spent considerable time adjusting IDE configuration & extensions but eventually moved on and relied on the npx expo lint command instead.

## Given more time

1. I would create Github Actions that will run a pipeline each time code is pushed to the repository.
1. I would implement the stretch goal where users can access their contacts. However, I’ve managed to implement quick re-send functionality from recent transfers.
