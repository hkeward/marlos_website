<%--
  Created by IntelliJ IDEA.
  User: bats
  Date: 3/29/19
  Time: 5:53 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Create user</title>
</head>
<body>
    <h1>Create user</h1>
    <form action="user" method="post">
        <p class="form">
            <label>Username:</label>
            <label>
                <input type="text" name="username">
            </label><br>
        </p>
        <p class="form">
            <label>Password:</label>
            <label>
                <input type="text" name="password">
            </label><br>
        </p>
        <p class="form">
            <label>First name:</label>
            <label>
                <input type="text" name="firstName">
            </label><br>
        </p>
        <p class="form">
            <label>Last name:</label>
            <label>
                <input type="text" name="lastName">
            </label><br>
        </p>
        <p class="form">
            <label>Email address:</label>
            <label>
                <input type="text" name="email">
            </label><br>
        </p>
        <input type="submit" value="Create user">
    </form>
</body>
</html>
