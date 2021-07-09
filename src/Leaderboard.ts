import { User } from "./types";

type LeaderboardProps = {
  users: User[];
};

export class LeaderBoard {
  private users: User[];
  private header = "Count Leaderboard";
  constructor({ users }: LeaderboardProps) {
    this.users = users;
  }

  toString = () => {
    return `
    **********************
    ${this.header}:
    ***********************
    ${this.users
      .sort((a, b) => b.count - a.count)
      .map((user, idx) => {
        return `${idx + 1}. <@${user.id}> - ${user.count}`;
      })
      .join("\n")}`;
  };
}
