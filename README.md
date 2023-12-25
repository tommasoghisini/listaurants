# Listaurants

Listaurants is a mobile-first React application designed to simplify restaurant discovery in Copenhagen. The application allows users to create, share, and explore lists of restaurants, facilitating a social and collaborative approach to dining out.

The application is designed to simulate a mobile (touch) experience, with a maximum screen size set to mobile dimensions. This ensures that the user interface and experience are optimized for mobile users, providing an intuitive navigation experience.

## Contributors
- Jae Yoon Bae jaez@itu.dk 
- Tommaso Ghisini togh@itu.dk 
- Lydia Johanna Stenflo lyst@itu.dk 
- Susanna Maria Paulina Rantala susr@itu.dk

## Run the app in dev mode

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Docs
In `docs` are available the prototypes and the transcript of the user interviews. Figma wireframes and user flow are available [here](https://www.figma.com/file/7xtKxqYP6RxX2bAER2P6cD/Wireframes?type=design&node-id=0%3A1&mode=design&t=ELlkeUCB5B9vhhRc-1).



## Project Structure

```
.
├── README.md
├── docs
│   ├── UserInterviews.md
│   └── prototypes
│       ├── images
│       │   ├── comment.svg
│       │   ├── like.svg
│       │   └── ...
│       ├── main.css
│       ├── main.html
│       ├── start.html
│       └── style.css
├── package-lock.json
├── package.json
├── public
│   ├── icons
│   │   ├── add.svg
│   │   ├── addProfile.svg
│   │   └── ...
│   ├── images
│   │   ├── Alice.jpeg
│   │   └── ...
│   └── index.html
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components
    │   ├── AuthContext
    │   ├── ForgotPassword
    │   ├── FriendCard
    │   ├── ListCard
    │   ├── LoadingComponent
    │   ├── LoginForm
    │   ├── MainPage
    │   │   ├── Comment
    │   │   ├── LikeCommentSave
    │   │   ├── Post
    │   │   └── SaveListOverlay
    │   ├── NavBar
    │   ├── NavItem
    │   ├── NoPosts
    │   ├── NotificationCard
    │   ├── ProfilePicture2
    │   ├── ProtectedRoute
    │   ├── RestaurantCard
    │   ├── SignupForm
    │   ├── TopbarSignup
    │   └── shared
    │       ├── Button
    │       ├── ButtonShort
    │       ├── CategoryButton
    │       ├── CustomProgress
    │       ├── GoBackButton
    │       ├── Icon
    │       ├── Input
    │       ├── ProfilePicture
    │       ├── TopBar
    │       └── UploadImageButton
    ├── data
    │   └── user1.json
    ├── index.css
    ├── index.js
    ├── pages
    │   ├── AddRestaurantPage
    │   ├── EditProfilePage
    │   ├── FriendsPage
    │   ├── ListPage
    │   ├── LoginProcess
    │   │   ├── AddProfilePicture
    │   │   ├── AddedProfilePicture
    │   │   ├── LoginPage
    │   │   ├── SignupNamePage
    │   │   ├── SignupPage
    │   │   └── VerificationPage
    │   ├── MainPage
    │   ├── NotificationPage
    │   └── ProfilePage
    └── reportWebVitals.js
```