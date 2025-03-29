function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = { 1: "Nishant", 2: "Ansh", 3: "Vishal" };

      const user = users[userId];
      if (user) {
        console.log("Api call successful");
        console.log("User data fetched:");

        resolve(user);
      } else {
        console.log("Api call failed");
        reject(new Error("User not found"));
      }
    }, 2000);
  });
}

fetchUserData(1)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
console.log("Request sent");
