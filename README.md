# Example
const { handleChange, handleSubmit, ref, errors } = useForm<ILogin>({
    defaultValue: {
      username: "",
      password: "",
      selectedFruit: "orange",
    },
    validations: {
      username: {
        // required: true,
        // message: "Provide Username",
        validate: (value) => ({
          requirement: value.length > 4,
          message: "Length should be greater than 4",
        }),
      },
      password: {
        required: true,
        message: "Provide Password",
        // validate: (val) => {
        //   return false;
        // },
      },
    },
  });

  const handleLogin = (data: ILogin) => {
    console.log(data);
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(handleLogin)}>
      <h3>Login Here</h3>
      <label>Username</label>
      <input name="username" onChange={handleChange} placeholder="Username" />
      {errors && errors["username"]}
      <label>Password</label>
      <input
        name="password"
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      {errors && errors["password"]}
      <select name="selectedFruit" onChange={handleChange}>
        <option value="apple">
          Apple
        </option>
        <option value="banana">
          Banana
        </option>
        <option value="orange">
          Orange
        </option>
      </select>
      <button>Log In</button>
    </form>