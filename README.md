## Rules

- add/remove/modify existing code to achieve the end result (some code needs a refactor)
- don't install additional packages
- you need to use `zustand`, but it's up to you to decide what state should be global
- write the code like it's a real feature

### Cards

- add expand/collapse functionality
- make sure the "Delete" button works
- add animations

### Deleted Cards

- display the number of deleted cards
- reveal deleted cards after user clicks the "Reveal" button - deleted card variant shouldn't contain the description
- write the code, so in the future you will be able to add "revert" functionality

### Behavior

- cards by default should be collapsed
- expanded/deleted cards' state needs to be persisted after "refreshing" (regardless of isVisible property)
- "refresh" functionality needs to be implemented using `react-query`

### Miscellaneous

- add a "Refresh" button (just like the "Reveal" button)
- create generic `<ToggleButton />`

### Additional

You may leave a message explaining your coding choices, but it's not necessary.
Testing framework isn't installed, so instead just explain whether you think it's a good or bad idea to write tests for this feature or how to approach it.


### Possibilities to test in future

For unit testing, test individual functions and methods separately, like deleteCard, setVisibleCards, and other store actions.
You should also mock API calls in useGetListData to simulate different scenarios such as successful data fetches, errors, and loading states.
For component testing, test React components like Entrypoint, CardList, and Card to make sure they render properly with different props. Additionally, use React Testing Library to simulate user interactions, like clicking buttons or expanding cards, and check if the expected outcomes occur.
