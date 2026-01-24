class FormationManager {
    constructor() {

    }

    getFormations() {
        return [
            '5-4-1',
            '5-3-2',
            '4-5-1',
            '4-4-2',
            '4-3-3',
            // '4-2-3-1',
            '3-5-2',
            '3-4-3'
        ]
    }
    
    setFormation(f) {
        this.formation = f;
    }

    getFormation() {
        return this.formation;
    }

    changeFormation541(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';
        players[4].grid = '2:4';
        players[5].grid = '2:5';

        players[6].grid = '3:1';
        players[7].grid = '3:2';
        players[8].grid = '3:3';
        players[9].grid = '3:4';
        
        players[10].grid = '4:1';
    }

    changeFormation532(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';
        players[4].grid = '2:4';
        players[5].grid = '2:5';

        players[6].grid = '3:1';
        players[7].grid = '3:2';
        players[8].grid = '3:3';

        players[9].grid = '4:1';
        players[10].grid = '4:2';
    }

    changeFormation451(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';
        players[4].grid = '2:4';

        players[5].grid = '3:1';
        players[6].grid = '3:2';
        players[7].grid = '3:3';
        players[8].grid = '3:4';
        players[9].grid = '3:5';

        players[10].grid = '4:1';
    }

    changeFormation442(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';
        players[4].grid = '2:4';

        players[5].grid = '3:1';
        players[6].grid = '3:2';
        players[7].grid = '3:3';
        players[8].grid = '3:4';

        players[9].grid = '4:1';
        players[10].grid = '4:2';
    }

    changeFormation433(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';
        players[4].grid = '2:4';

        players[5].grid = '3:1';
        players[6].grid = '3:2';
        players[7].grid = '3:3';

        players[8].grid = '4:1';
        players[9].grid = '4:2';
        players[10].grid = '4:3';
    }

    changeFormation4231(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';
        players[4].grid = '2:4';

        players[5].grid = '3:1';
        players[6].grid = '3:2';

        players[7].grid = '4:1';
        players[8].grid = '4:2';
        players[9].grid = '4:3';

        players[10].grid = '5:1';
    }

    changeFormation352(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';

        players[4].grid = '3:1';
        players[5].grid = '3:2';
        players[6].grid = '3:3';
        players[7].grid = '3:4';
        players[8].grid = '3:5';

        players[9].grid = '4:1';
        players[10].grid = '4:2';
    }

    changeFormation343(players) {
        players[0].grid = '1:1';

        players[1].grid = '2:1';
        players[2].grid = '2:2';
        players[3].grid = '2:3';

        players[4].grid = '3:1';
        players[5].grid = '3:2';
        players[6].grid = '3:3';
        players[7].grid = '3:4';

        players[8].grid = '4:1';
        players[9].grid = '4:2';
        players[10].grid = '4:3';
    }
}

const formationManager = new FormationManager();
export default formationManager;