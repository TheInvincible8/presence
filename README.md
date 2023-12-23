## Portfolio Website

### Create Your Own Steps

I've used Prismic(CMS) as content provider and Vercel to host the app.

-   Create A Prismic Repo [Read Here](https://prismic.io/docs/guides/repository)
-   Clone Repo and Install Dependencies
    ```.sh
    git clone git@github.com:RAY-EZ/presence.git && cd presence && npm i
    ```
-   Add your repository name in `slicemachine.config.json`

    ```
    {
        "repositoryName": "Your Repository Name",
        "adapter": "@slicemachine/adapter-next",
        ...

    }
    ```

-   Run Slicemachine script and push all the slices to the Prismic. More About [Slices](https://prismic.io/docs/slice) and [Slice Machine](https://prismic.io/docs/technical-reference/slice-machine-ui)
-   Add Content On Prismic.
-   Deploy on Vercel. How? [here](https://vercel.com/docs/deployments/overview)

#### Spotify Integration

-   Create app [here](https://developer.spotify.com/).
-   Set Callback Url to `http://yourhost.com/api/spotify/callback`
-   Add `client-secret` and `client-id in` `.env` file.
-   Give App permission via hitting `http://yourhost/api/spotify/login`
-   Play song 👾
