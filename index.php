<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brandify - Liste des personnages</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <a href="index.php">
            <img src="assets/images/brandify_logo.svg" alt="Brandify Logo">
        </a>
    </header>

    <main>
        <section id="filters">
            <button id="filter-all">Tous</button>
            <button id="filter-alive">Vivant</button>
            <button id="filter-dead">Mort</button>

            <div id="search">
                <input type="text" id="search-input" placeholder="Rechercher un personnage...">
                <button id="search-button">Rechercher</button>
            </div>
        </section>

        <section id="characters">
            
        </section>

        <div id="pagination">
            
        </div>
    </main>

    <script src="assets/js/app.js"></script>
</body>
</html>
