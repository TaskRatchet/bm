import { useState } from "preact/hooks";
import { login } from "../auth";
import Center from "./center";
import "./login.css";

type Config = {
  username: string;
  auth_token: string;
};

function isConfig(data: unknown): data is Config {
  return (
    typeof data === "object" &&
    data !== null &&
    "username" in data &&
    "auth_token" in data
  );
}

export default function Login() {
  const [config, setConfig] = useState<string>("");

  return (
    <Center>
      <div class="login">
        <p>
          Retrieve your API config{" "}
          <a href="https://www.beeminder.com/api/v1/auth_token.json">here</a>.
        </p>
        <input
          placeholder="Config"
          value={config}
          onChange={(e) => setConfig(e.currentTarget.value)}
        />
        <button
          onClick={() => {
            const data: unknown = JSON.parse(config);

            if (!isConfig(data)) {
              throw new Error("Invalid config");
            }

            login(data.username, data.auth_token);
          }}
        >
          Save
        </button>
      </div>
    </Center>
  );
}
