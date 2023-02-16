export default function Login() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("username", e.currentTarget.username.value);
        localStorage.setItem("api_key", e.currentTarget.key.value);
        window.location.href = "/";
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
  );
}
