import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    newMemberName: string = '';
    members: string[] = [];
    numberOfTeams: number | '' = '';
    errorMessage: string = '';
    teams: string[][] = [];

    onNameInput(member: string) {
        this.newMemberName = member;
    }

    onNumberOfTeamsInput(number: string) {
        this.numberOfTeams = Number(number);
    }

    addMember() {
        this.teams = [];

        if (!this.newMemberName) {
            this.errorMessage = "Name can't be empty!";
            return;
        }
        this.errorMessage = '';
        this.members.push(this.newMemberName);
        this.newMemberName = '';
    }

    generateTeams() {
        /* {numberOfTeams} should be a number and positive */
        if (!this.numberOfTeams || this.numberOfTeams <= 0) {
            this.errorMessage = "Invalid number of teams!";
            return;
        }

        if (this.members.length < this.numberOfTeams) {
            this.errorMessage = "Not enough members!";
            return;
        }

        this.errorMessage = '';

        /* Reference to the members array */
        const allMembers = [...this.members];

        while (allMembers.length) {
            for (let index = 0; index < this.numberOfTeams; index++) {
                const randomIndex = Math.floor(Math.random() * allMembers.length);
                const member = allMembers.splice(randomIndex, 1)[0];

                /* Abort if no member can be assigned anymore */
                if (!member) break;

                /* Assigning members in teams */
                if (this.teams[index]) {
                    this.teams[index].push(member);
                } else {
                    this.teams[index] = [member];
                }
            }
        }


        this.members = [];
        this.numberOfTeams = '';

    }
}
