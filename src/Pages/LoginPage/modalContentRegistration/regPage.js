import React from "react";

export default function RegPage() {
  return (
    <div>
      <div>
        <label htmlFor="firstName">Ваше имя</label>
        <input id="firstName" type="text" />
      </div>

      <div>
        <label htmlFor="secondName">Ваша фамилия</label>
        <input id="secondName" type="text" />
      </div>

      <div>
        <label htmlFor="Role">Роль</label>
        <select id="Role">
          <option value="Руководитель">Руководитель</option>
          <option value="Подчиненный">Подчиненный</option>
        </select>
      </div>

      <div>
        <label htmlFor="login">Логин</label>
        <input id="login" type="text" />
      </div>

      <div>
        <label htmlFor="password">Пароль</label>
        <input id="password" type="password" />
      </div>
    </div>
  );
}
