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
        const venues1 = store.getPlacesToGo(['Alan Allen']);

        expect(venues1.length).to.equal(4);
        expect(venues1[0].name).to.equal('El Cantina');
        expect(venues1[1].name).to.equal('Twin Dynasty');
        expect(venues1[2].name).to.equal('Wagamama');
        expect(venues1[3].name).to.equal('Fabrique');
    });

    it('should filter venues for 2 users', function() {
        const venues1 = store.getPlacesToGo(['Alan Allen', 'Bobby Robson']);

        expect(venues1.length).to.equal(3);
        expect(venues1[0].name).to.equal('Twin Dynasty');
        expect(venues1[1].name).to.equal('Wagamama');
        expect(venues1[2].name).to.equal('Fabrique');
    });

    it('should filter venues for 3 users', function() {
        const venues1 = store.getPlacesToGo(['Alan Allen', 'Bobby Robson', 'David Lang']);

        expect(venues1.length).to.equal(1);
        expect(venues1[0].name).to.equal('Wagamama');
    });

    it('should return places to avoid', function() {

        const users1 = getUsersData(users, ['Alan Allen', 'Bobby Robson', 'David Lang']);

        const venues1 = getPlacesToAvoid(venues, users1);

        expect(venues1.length).to.equal(4);

        expect(venues1[0].name).to.equal('El Cantina');
        expect(venues1[0].food[0]).to.equal('Bobby Robson');

        expect(venues1[1].name).to.equal('Twin Dynasty');
        expect(venues1[1].food[0]).to.equal('David Lang');

        expect(venues1[2].name).to.equal('Spirit House');
        expect(venues1[2].drinks[0]).to.equal('Alan Allen');
    });

    it('should return from store places to avoid', function() {

        const venues1 = store.getPlacesToAvoid(['Bobby Robson', 'David Lang']);

        expect(venues1.length).to.equal(3);

        expect(venues1[0].name).to.equal('El Cantina');
        expect(venues1[0].food[0]).to.equal('Bobby Robson');

        expect(venues1[1].name).to.equal('Twin Dynasty');
        expect(venues1[1].food[0]).to.equal('David Lang');

        expect(venues1[2].name).to.equal('Fabrique');
        expect(venues1[2].drinks[0]).to.equal('David Lang');
    });
});