# Empire Game

Do you have what it takes to be a tech billionaire?

### [Play Now](https://empire-game.now.sh/)

![Game Start](https://raw.githubusercontent.com/caseyyee/empire-game/master/screens/empire-1.png)


## Design Goals

* The goal is to create a satirical game, poking fun at the life of a modern day Tech Startup entrepreneur.

* Gameplay was inspired from [Adventure Captalism](http://en.gameslol.net/adventure-capitalist-1086.html), but with a different take on the story, UX, visual design and layout.  Functionally they work in a similar manner.

![Game Start](https://raw.githubusercontent.com/caseyyee/empire-game/master/screens/empire-2.png)

## Features
* User On-boarded and guided into game.
* Ability to purchase companies as you grow your balance.
* Progress the user through Gameplay through the use of App Notifications.
* Managers feature allows for automatic company progression.
* Company levels, accelerated production time.
* Scaled company costs.
* Empire OS design
* Fully responsive desktop to mobile.

![Game Start](https://raw.githubusercontent.com/caseyyee/empire-game/master/screens/empire-mobile-2.png)
![Game Start](https://raw.githubusercontent.com/caseyyee/empire-game/master/screens/empire-mobile-3.png)

## Future Ideas 

* Chatbot interface.  See how conversations change between you and your best friends as your fortune grows.
* Music player. Select tunes as you profit.
* See headlines from TechCrunch as your companies scale.
* Multiple users, race to a billion!
* Charts app to see your overall progress.
* Needs to be a challenge, make a mistake, put companies into negative spend.
* Persistance and saving user state over re-visits.
* Performance Optimizations
* See [Open Issues](https://github.com/caseyyee/empire-game/issues?q=is%3Aopen+is%3Aissue)

## The stack

* server-rendered Next.js
* Javascript ES6
* Hooks based React
* React Context for managing state
* Chakra-UI, Styled-System for CSS-in-JS
* Framer Motion & CSS animations
* Deploys on now.sh

## Some additional thoughts

* I thnk overall, React seems like a good solution for this game given how state heavy the app is, my own familiarity using it, and the time constraints on the project. It certainly allows me to move fast. Especially with styling, layout responsiveness.
* There are a lot of performance optimizations that can be done around component and state updates, primarily around updating and listening for state changes in the balance.  A different approach would work much more efficiently.
* Would I use React again?  For most most bits, yes. Afformentioned styling, layout and responsiveness are pretty great. Though I would eject from React for managing the balance.


# Local Development

1. Install Dependencies

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Contributing

- See [Open Issues](https://github.com/caseyyee/empire-game/issues?q=is%3Aopen+is%3Aissue)
- Find a bug? [File an issue](https://github.com/caseyyee/empire-game/issues/new/choose)

## Configuration

| file              | use                        |
| ----------------- | -------------------------- |
| config.js         | General game configuration |
| data/companies.js | Companies configuration    |
| data/menu.js      | Menu/Apps configuration    |

## Thank You!

It was a fun build, surprised you read this far.  :sunglasses:
