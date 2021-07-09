import discordClient from "./discordClient";
import apolloClient from "./apolloClient";
import { LeaderBoard } from "./Leaderboard";
import { GET_USERS, INCREMENT_COUNT } from "./graphql";

discordClient.login(process.env.BOT_TOKEN);

discordClient.on("ready", () => {
  console.log(`Let's do this`);
});

discordClient.on("message", async (msg) => {
  switch (msg.content) {
    case "!leaderboard":
    case "!leaderboards": {
      const res = await apolloClient.query({
        query: GET_USERS,
      });
      console.log(res);
      console.log(res.data);
      const leaderboard = new LeaderBoard({ users: res.data.user });
      msg.reply(leaderboard.toString());
      break;
    }
    case "!increment": {
      const user = msg.author;
      await apolloClient.mutate({
        mutation: INCREMENT_COUNT,
        variables: { discord_id: user.id.toString() },
      });
      console.log(user);
      break;
    }
    // do nothing
    default: {
    }
  }
});
