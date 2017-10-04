
import intersection from 'lodash/intersection';
import remove from 'lodash/remove';
import indexOf from 'lodash/indexOf';

export const getUsersData = (users = [], entry = []) => {
    const data = users.filter((item) => {
        return entry.indexOf(item.name) !== -1;
    });

    return data;
};

export const getPlacesToGo = (venues = [], users = []) => {
    let userNoFood = [];
    let userDrinks = [];

    users.forEach((user) => {
        userNoFood.push.apply(userNoFood, user.wont_eat);
        userDrinks.push.apply(userDrinks, user.drinks);
    });

    const filterVenuesByDrinks = venues.filter((venue) => {

        const usersFilter = users.filter((user) => {
            const interDrinks = intersection(venue.drinks, user.drinks);
            return interDrinks.length > 0;
        });

        return usersFilter.length === users.length;
    });

    const filterVenuesByFood = filterVenuesByDrinks.filter((venue) => {
        const clone = venue.food.slice(0);

        remove(clone, function (food) {
            return indexOf(userNoFood, food) === -1;
        });

        return clone.length > 0;
    });

    return filterVenuesByFood;
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
}

export default AiStore;
