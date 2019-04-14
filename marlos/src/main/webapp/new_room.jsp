<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Room creation</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Room creation</h1>
    <form action="add_room" method="post">
        <p class="form">
            <label>Name:</label>
            <input type="text" name="name"><br>
        </p>
        <p class="form">
            <label>Type:</label>
            <input type="text" name="type"><br>
        </p>
        <p class="form">
            <label>Description:</label>
            <input type="text" name="type"><br>
        </p>
        <p class="form">
            <label>Creatures:</label>
            <input type="text" name="type"><br>
        </p>
        <input type="submit" value="Create room">
    </form>
</body>
</html>
