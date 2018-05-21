# 8. Implement redux as a state manager

Date: 2018-05-21

## Status

Accepted

## Context

An application has many components that it will use and update. Information is passed between components in the form of state to do this. Redux is a predictable state container for JavaScript apps. Another option is the React Context API which is used to pass global state information between components. Redux offers better Dev tool integration and has better documnetation on its use with Next.js. Redux has been tried and tested by multiple projects and has existed for a longer period of time. React Context API is easier to implement and offers better performance but is best suited for global variables (https://reactjs.org/docs/context.html#why-not-to-use-context).


## Decision

We will use redux store, actions and reducers to manage the state of our application and individual components.

## Consequences

Switching to a different state manager in the future would prove to be difficult due to the nature of its implementation.

Changing data in the view will need to implement Redux.



