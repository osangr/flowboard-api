import server from "./config/server";
import colors from "colors";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(colors.cyan(`Server is running on port ${PORT}`));
});
