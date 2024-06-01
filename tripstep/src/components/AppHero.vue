<template>
    <section class="hero-section">
        <div class="container">
            <div class="row">
                <div class="col-7"></div>
            </div>
            <div class="row">
                <div class="col-5 hero-info">
                    <div class="row">
                        <div class="col-12 text-logo"><span>tripstep</span></div>
                    </div>
                </div>
                <div class="col-7">
                    <img id="hero-img" :src="heroImage" alt="" />
                </div>
            </div>
            <div class="row">
                <div class="col-7"></div>
            </div>
        </div>
    </section>
    <section class="hero-section">
        <div class="container">
            <div class="row">
                <div class="col-7"></div>
            </div>
            <div class="row">
                <div class="col-5 hero-info">
                    <div class="row">
                        <div class="col-12 text-logo"><span>tripstep</span></div>
                    </div>
                </div>
                <div class="col-7">
                    <img id="hero-img" :src="heroImage" alt="" />
                </div>
            </div>
            <div class="row">
                <div class="col-7"></div>
            </div>
        </div>
    </section>
</template>

<script>
    import heroImage from "@/assets/hero-img.jpg"

    export default {
        data() {
            return {
                heroImage
            }
        }
    }
</script>

<style>
    .hero-section {
        height: 97vh;
    }

    .hero-info {
        display: flex;
        flex-direction: column;
        justify-content: center;


    }

    .hero-text {
        font-weight: 700;
        font-size: 2.5rem;
    }


    #hero-img {
        width: 400px;
        height: auto;
        border-radius: 66% 34% 74% 26% / 30% 55% 45% 70%;
        border: 4px solid black;
    }

    button {
        background-color: var(--banner);
    }


    .text-logo span {
        color: var(--orange);
        font-size: 4rem;
        font-weight: 900;
    }
</style>