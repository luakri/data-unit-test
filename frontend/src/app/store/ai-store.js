
import intersection from 'lodash/intersection';
import indexOf from 'lodash/indexOf';
import difference from 'lodash/difference';

export const getUsersData = (users = [], entry = []) => {
    const data = users.filter((item) => {
        return entry.indexOf(item.name) !== -1;
    });

    return data;
};

const filterByFood = (venues = [], users = []) => {

    const filterVenues = venues.filter((venue) => {
        const food = venue.food;
        let found = 0;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const wont_eat = user.wont_eat;
            const wontEatLength = wont_eat.length;

            for (let z = 0; z < wontEatLength; z++) {
                const wontEat = wont_eat[z];

                if (indexOf(food, wontEat) === -1) {
                    found += 1;
                    break;
                }
            }
        }

        return found === users.length;
    });

    return filterVenues;
};

const filterByDrinks = (venues = [], users = []) => {

    const filterVenues = venues.filter((venue) => {
        const drinks = venue.drinks;
        let found = 0;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const user_drinks = user.drinks;
            const drinksLength = user_drinks.length;

            for (let z = 0; z < drinksLength; z++) {
                const userDrinks = user_drinks[z];

                if (indexOf(drinks, userDrinks) !== -1) {
                    found += 1;
                    break;
                }
            }
        }

        return found === users.length;
    });

    return filterVenues;
};

const reduceNoFood = (food = [], wont_eat = []) => {
    const diff = difference(food, wont_eat);

    return diff.length === 0;
};

const reduceNoDrinks = (food = [], wont_eat = []) => {
    const diff = intersection(food, wont_eat);

    return diff.length === 0;
};

export const getPlacesToAvoid = (venues = [], users = []) => {
    const venuesLength = venues.length;
    const usersLength = users.length;
    let venuesIndex = 0;
    let result = [];

    for (; venuesIndex < venuesLength; venuesIndex++) {
        const venue = venues[venuesIndex];
        const food = venue.food;

        let usersIndex = 0;
        let prop = {};

        for (; usersIndex < usersLength; usersIndex++) {
            const user = users[usersIndex];
            const userWontEat = user.wont_eat;
            const userDrinks = user.drinks;

            const isNoFood = reduceNoFood(venue.food, userWontEat);

            if (isNoFood) {
                prop.name = venue.name;

                if (prop.food) {
                    prop.food.push(user.name);
                } else {
                    prop.food = [user.name];
                }
            }

            const isNoDrinks = reduceNoDrinks(venue.drinks, userDrinks);

            if (isNoDrinks) {
                prop.name = venue.name;

                if (prop.drinks) {
                    prop.drinks.push(user.name);
                } else {
                    prop.drinks = [user.name];
                }
            }
        }

        if (prop.name) {
            result.push(prop);
        }
    }

    return result;
};

export const getPlacesToGo = (venues = [], users = []) => {

    const filterFood = filterByFood(venues, users);

    const filterDrinks = filterByDrinks(filterFood, users);

    return filterDrinks;
};

class AiStore {

    constructor(users = [], venues = []) {
        this.users = users;
        this.venues = venues;
    }

    getPlacesToGo(entry = []) {
        const users = getUsersData(this.users, entry);

        const places = getPlacesToGo(this.venues, users);

        const result = `places to go:
        ${places.map(place => place.name)}
        `;

        return places;
    }

    getPlacesToAvoid(entry = []) {
        const users = getUsersData(this.users, entry);

        const places = getPlacesToAvoid(this.venues, users);

        return places;
    }
}

export default AiStore;
