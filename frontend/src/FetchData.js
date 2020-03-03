const backUrl = "http://144.202.105.126:8080/";

export const resolveJSON = (response) => {
  if (!response.ok) throw new Error("invalid");
  return response.json();
};

export function getDataList() {
  return fetch(backUrl + "data?session_token=" + localStorage.getItem("token")).then(resolveJSON).then(
    (data) =>
      data.map(item => [item.id, item.name, item.type === "training" ? "Training Set" : "Prediction Set", String(item.preview)])
  );
}

export function getModelList() {
  return fetch(backUrl + "models?session_token=" + localStorage.getItem("token")).then(resolveJSON).then(
    (data) =>
      data.map(item => [item.id, item.name, item.shared])
  );
}

export function getTaskList() {
  return fetch(backUrl + "task?session_token=" + localStorage.getItem("token")).then(resolveJSON).then(
    (data) =>
      data.map(item => [item.id, item.type, item.status]).filter(item => item[1] !== "preview")
  );
}

export function signIn(email, password) {
  const params = new URLSearchParams({
    "email": email,
    "password": password
  });
  return fetch(backUrl + "session?" + params.toString(), {
    method: "POST"
  }).then(resolveJSON).then((data) => {
    console.log(JSON.stringify(data));
    localStorage.setItem("token", data.user_token);
    localStorage.setItem("id", data.user_id);
    localStorage.setItem("email", email);
    window.location.href = "/";
  })
}

export function signUp(email, password) {
  const params = new URLSearchParams({
    "email": email,
    "password": password
  });
  return fetch(backUrl + "user?" + params.toString(), {
    method: "POST"
  }).then(resolveJSON);
}

export function signOut(token) {
  return fetch(backUrl + "session?session_token=" + token, {method: "DELETE"});
}
