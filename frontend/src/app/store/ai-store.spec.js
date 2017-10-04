import Store, {getUsersData, getPlacesToGo, getPlacesToAvoid}  from './ai-store';
import users from './users.json';
import venues from './venues.json'

describe('# AI Store Scenario', function() {

    let store = null;

    beforeEach(function() {
        store = new Store(users, venues);
    });

    afterEach(function () {
        store = null;
    });

    it('should have default methods', function() {
        expect(typeof store).to.equal('object');
    });

    it('should filter users data from entry', function() {

        const users1 = getUsersData(users, ['Bobby Robson']);

        expect(users1[0].name).to.equal('Bobby Robson');

        const users2 = getUsersData(users, ['Gavin Coulson', 'David Lang']);

        expect(users2[0].name).to.equal('Gavin Coulson');
        expect(users2[1].name).to.equal('David Lang');

        const users3 = getUsersData(users, ['Gary Jones', 'Gavin Coulson', 'Bobby Robson']);

        expect(users3[0].name).to.equal('Gary Jones');
        expect(users3[1].name).to.equal('Gavin Coulson');
        expect(users3[2].name).to.equal('Bobby Robson');
    });

    it('should filter venues for 1 user', function() {
        const venues1 = store.getPlacesToGo(['Robert Webb']);

        expect(venues1.length).to.equal(2);

        expect(venues1[0].name).to.equal('Spice of life');
        expect(venues1[1].name).to.equal('The Cambridge');
    });

    it('should filter venues for 2 user', function() {
        const users1 = getUsersData(users, ['John Davis', 'Gary Jones']);

        const venues1 = getPlacesToGo(venues, users1);

        expect(venues1.length).to.equal(4);

        expect(venues1[0].name).to.equal('Spice of life');
        expect(venues1[1].name).to.equal('The Cambridge');
        expect(venues1[2].name).to.equal('Sultan Sofrasi');
        expect(venues1[3].name).to.equal('Tally Joe');
    });
});