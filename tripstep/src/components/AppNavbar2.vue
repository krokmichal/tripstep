<template>
    <div>
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container navbar nav1">
                <a class="navbar-brand" href="#">
                    tripstep</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse nav2" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Review</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link active" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Contact</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Sign In</a>
                            </li>
                        </ul>
                        <button class="button" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    a:hover {
        color: var(--orange);
        transition: 0.3s;
    }

    nav {
        font-weight: 500;
        font-size: 1.1rem;
    }

    .nav1 {
        justify-content: space-between;
    }

    .nav2 {
        justify-content: space-around;
    }

    .button {
        background-color: var(--orange);
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
    }

    .button:hover {
        box-shadow: 0 0 20px 0 var(--orange);
        transition: 0.3s;
    }

    .d-flex .nav-item {
        margin-right: 1em;
    }
</style>