import discordClient from "./discordClient";
import apolloClient from "./apolloClient";
import { LeaderBoard } from "./Leaderboard";
import { ADD_USER, GET_USERS, INCREMENT_COUNT } from "./graphql";

discordClient.login(process.env.BOT_TOKEN);

discordClient.on("ready", () => {
  console.log(`Let's do this`);
});

discordClient.on("message", async (msg) => {
  switch (msg.content) {
    case "!leaderboard":
    case "!leaderboards":
    case "!lb":
    case "!ls": {
      const res = await apolloClient.query({
        query: GET_USERS,
      });
      const leaderboard = new LeaderBoard({ users: res.data.user });
      msg.reply(leaderboard.toString());
      break;
    }
    case "!increment":
    case "!inc": {
      const user = msg.author;
      const res = await apolloClient.mutate({
        mutation: INCREMENT_COUNT,
        variables: { discord_id: user.id.toString() },
      });

      // User does not exist in the db, so add them
      if (res.data.update_user?.affected_rows === 0) {
        await apolloClient.mutate({
          mutation: ADD_USER,
          variables: {
            discord_id: user.id.toString(),
            name: user.username,
            count: 1,
          },
        });
      }
      break;
    }
    // do nothing
    default: {
    }
  }
});
