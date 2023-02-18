import { login } from "../auth";
import Center from "./center";
import "./login.css";

export default function Login() {
  return (
    <Center>
      <form
        class="login"
        onSubmit={(e) => {
          e.preventDefault();
          login(e.currentTarget.username.value, e.currentTarget.key.value);
        }}
      >
        <p>
          Retrieve your API token{" "}
          <a href="https://www.beeminder.com/api/v1/auth_token.json">here</a>.
        </p>
        <input placeholder="Username" name="username" id="username" />
        <input placeholder={"Beeminder API key"} name="key" id="key" />
        <input type={"submit"} value={"Save"} />
      </form>
    </Center>
  );
}
