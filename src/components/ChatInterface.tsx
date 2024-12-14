import React, { useState, useRef, useEffect } from "react";

import Message from "./Message.tsx";
import ChatInput from "./ChatInput.tsx";
import { MessageType } from "../common/dtos/Message.dtos";
import { ASK_CODE_EP } from "../common/endpoints/Endpoints.ts";
import api from "../api/Instance.ts";
import darthMaul from "../assets/images/darth_maul.gif";
import blueLightSaber from "../assets/images/bluelightsaber.png";
import stormTrooper from "../assets/images/storm_trooper.gif";
import ReactMarkdown from "react-markdown";

const ChatInterface = () => {
  const [messages, setMessages] = useState([] as MessageType[]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const summary =
    "# **Codebase Documentation**\n\n## 1. Folder Structure\n\nThe following is a visualization of the folder structure for the codebase, organized by modules and components:\n\n```\n.\n├── App.css\n├── App.js\n├── App.test.js\n├── components\n│   ├── Collection\n│   │   ├── CollectionCard\n│   │   │   ├── CollectionCard.component.jsx\n│   │   │   └── CollectionCard.styles.scss\n│   │   └── CollectionInfo\n│   │       ├── CollectionInfo.component.jsx\n│   │       └── CollectionInfo.styles.scss\n│   ├── Common\n│   │   ├── Footer\n│   │   │   ├── Footer.component.jsx\n│   │   │   └── Footer.styles.scss\n│   │   ├── Header\n│   │   │   ├── Header.component.jsx\n│   │   │   └── Header.styles.scss\n│   │   ├── Message\n│   │   │   ├── Message.component.jsx\n│   │   │   └── Message.styles.scss\n│   │   ├── ProgressBar\n│   │   │   ├── ProgressBar.component.jsx\n│   │   │   └── ProgressBar.styles.scss\n│   │   ├── Subtitle\n│   │   │   ├── Subtitle.component.jsx\n│   │   │   └── Subtitle.styles.scss\n│   │   └── Lists\n│   │       ├── StoresList.component.jsx\n│   │       ├── TextList.component.jsx\n│   │       └── Lists.styles.scss\n│   ├── Games\n│   │   ├── Details\n│   │   │   ├── Details.component.jsx\n│   │   │   └── Details.styles.scss\n│   │   ├── Game\n│   │   │   ├── Game.component.jsx\n│   │   │   └── Game.styles.scss\n│   │   ├── ListsOfGames\n│   │   │   ├── ListsOfGames.component.jsx\n│   │   │   └── ListsOfGames.styles.scss\n│   │   ├── SearchBar\n│   │   │   ├── SearchBar.component.jsx\n│   │   │   └── SearchBar.styles.scss\n│   │   └── Screenshots\n│   │       ├── Screenshots.component.jsx\n│   │       └── Screenshots.styles.scss\n│   ├── pages\n│   │   ├── GenreDetail\n│   │   │   ├── GenreDetail.component.jsx\n│   │   │   └── GenreDetail.styles.scss\n│   │   ├── Genres\n│   │   │   ├── Genres.component.jsx\n│   │   │   └── Genres.styles.scss\n│   │   ├── Home\n│   │   │   ├── HomePage.component.jsx\n│   │   │   └── HomePage.styles.scss\n│   │   ├── PlatformDetail\n│   │   │   ├── PlatformDetail.component.jsx\n│   │   │   └── PlatformDetail.styles.scss\n│   │   ├── Platforms\n│   │   │   └── Platforms.component.jsx\n│   │   ├── Publishers\n│   │   │   ├── Publishers.component.jsx\n│   │   │   └── Publishers.styles.scss\n│   │   └── PublisherDetail\n│   │       ├── PublisherDetail.component.jsx\n│   │       └── PublisherDetail.styles.scss\n│   ├── context\n│   │   ├── GameDetailsContext.js\n│   │   ├── GenreDetailContext.js\n│   │   ├── GenresContext.js\n│   │   ├── GamesContext.js\n│   │   ├── PlatformDetailContext.js\n│   │   ├── PlatformsContext.js\n│   │   └── PublishersContext.js\n│   ├── serviceWorker.js\n│   ├── index.js\n│   ├── index.css\n│   └── constants\n│       └── index.js\n└── setupTests.js\n\n```\n\n## 2. Module Overview\n\n### 2.1. Components Module\n\nThe **Components** module contains reusable UI components that are used throughout the application. Each component is designed to encapsulate specific functionality and styling.\n\n#### 2.1.1. Collection\n- **CollectionCard**\n  - **CollectionCard.component.jsx**: Renders a collection of items in a card format using Material-UI components.\n  - **CollectionCard.styles.scss**: Styles for the CollectionCard component, including hover effects and layout.\n\n- **CollectionInfo**\n  - **CollectionInfo.component.jsx**: Displays detailed information about a collection item.\n  - **CollectionInfo.styles.scss**: Styles for the CollectionInfo component.\n\n#### 2.1.2. Common\n- **Footer**\n  - **Footer.component.jsx**: Renders the footer section of the application with copyright information and links.\n  - **Footer.styles.scss**: Styles for the footer component.\n\n- **Header**\n  - **Header.component.jsx**: Navigation bar for the application, including links to different sections.\n  - **Header.styles.scss**: Styles for the header component.\n\n- **Message**\n  - **Message.component.jsx**: Displays messages to the user.\n  - **Message.styles.scss**: Styles for the Message component.\n\n- **ProgressBar**\n  - **ProgressBar.component.jsx**: Circular progress indicator for loading states.\n  - **ProgressBar.styles.scss**: Styles for the ProgressBar component.\n\n- **Subtitle**\n  - **Subtitle.component.jsx**: Renders subtitles in a consistent format.\n  - **Subtitle.styles.scss**: Styles for the Subtitle component.\n\n- **Lists**\n  - **StoresList.component.jsx**: Renders a list of stores with links.\n  - **TextList.component.jsx**: Renders a list of items with optional titles.\n  - **Lists.styles.scss**: Styles for list components.\n\n#### 2.1.3. Games\n- **Details**\n  - **Details.component.jsx**: Displays detailed information about a specific game.\n  - **Details.styles.scss**: Styles for the game details component.\n\n- **Game**\n  - **Game.component.jsx**: Renders a list of game cards.\n  - **Game.styles.scss**: Styles for the game card component.\n\n- **ListsOfGames**\n  - **ListsOfGames.component.jsx**: Renders a list of games categorized into sections.\n  - **ListsOfGames.styles.scss**: Styles for the ListsOfGames component.\n\n- **SearchBar**\n  - **SearchBar.component.jsx**: Customizable search input field for games.\n  - **SearchBar.styles.scss**: Styles for the SearchBar component.\n\n- **Screenshots**\n  - **Screenshots.component.jsx**: Displays a collection of game screenshots.\n  - **Screenshots.styles.scss**: Styles for the Screenshots component.\n\n### 2.2. Pages Module\n\nThe **Pages** module contains components that represent different pages in the application.\n\n#### 2.2.1. GenreDetail\n- **GenreDetail.component.jsx**: Displays detailed information about a specific genre and its associated games.\n- **GenreDetail.styles.scss**: Styles for the GenreDetail page.\n\n#### 2.2.2. Genres\n- **Genres.component.jsx**: Displays a list of genres.\n- **Genres.styles.scss**: Styles for the Genres page.\n\n#### 2.2.3. Home\n- **HomePage.component.jsx**: Main interface for displaying games.\n- **HomePage.styles.scss**: Styles for the HomePage component.\n\n#### 2.2.4. PlatformDetail\n- **PlatformDetail.component.jsx**: Displays details of a specific platform and its associated games.\n- **PlatformDetail.styles.scss**: Styles for the PlatformDetail page.\n\n#### 2.2.5. Platforms\n- **Platforms.component.jsx**: Renders a list of platforms.\n  \n#### 2.2.6. Publishers\n- **Publishers.component.jsx**: Displays a list of publishers.\n- **Publishers.styles.scss**: Styles for the Publishers page.\n\n#### 2.2.7. PublisherDetail\n- **PublisherDetail.component.jsx**: Displays details of a specific publisher and their associated games.\n- **PublisherDetail.styles.scss**: Styles for the PublisherDetail page.\n\n### 2.3. Context Module\n\nThe **Context** module establishes React contexts for managing state across the application.\n\n- **GameDetailsContext.js**: Manages game details and screenshots.\n- **GenreDetailContext.js**: Manages details related to a specific genre.\n- **GenresContext.js**: Manages game genres.\n- **GamesContext.js**: Manages various categories of games.\n- **PlatformDetailContext.js**: Manages platform-specific data.\n- **PlatformsContext.js**: Manages a list of game platforms.\n- **PublishersContext.js**: Manages the state of publishers.\n\n### 2.4. Other Files\n\n- **index.js**: Entry point for the React application.\n- **serviceWorker.js**: Code for registering and managing a service worker.\n- **setupTests.js**: Configuration for setting up testing utilities.\n- **constants/index.js**: Centralized configuration for API endpoints and utility functions.\n\n## 3. Summary of the Codebase\n\nThe codebase is a React application designed to provide a user-friendly interface for browsing video games, genres, platforms, and publishers. It utilizes various technologies and frameworks, including React, Material-UI for UI components, and SCSS for styling.\n\n### Key Technologies and Patterns:\n- **React**: The core library for building the user interface.\n- **React Router**: Used for client-side routing between different pages.\n- **Context API**: Manages global state across the application, allowing components to access shared data without prop drilling.\n- **Material-UI**: Provides pre-built components that enhance the visual appeal and responsiveness of the application.\n- **SCSS**: A preprocessor that allows for more organized and maintainable styles.\n\n### Interaction Between Modules:\nThe modules work together to create a cohesive user experience. For example, the **Games** module interacts with the **Context** module to fetch and display game data, while the **Pages** module renders these components in a structured layout. The **Common** components, such as the Header and Footer, provide consistent navigation and branding across all pages.\n\n### Notable Conventions:\n- **Component Reusability**: Components are designed to be reusable, promoting maintainability and reducing code duplication.\n- **Conditional Rendering**: Many components utilize conditional rendering to display loading indicators or messages based on the application's state.\n- **SCSS Organization**: Styles are organized in separate SCSS files for each component, allowing for modular styling and easier updates.\n\nThis documentation provides a comprehensive overview of the codebase, enabling new developers to quickly understand its structure, purpose, and functionality.";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (query: string) => {
    const userMessage: MessageType = {
      sender: "user",
      text: query,
      reference: "",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await api.post(ASK_CODE_EP, {
        message: query,
      });
      const botMessage: MessageType = {
        sender: "bot",
        text: response.data.responseCodeExplainer.textResponse,
        reference: response.data.responseQueryDetector.textResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: MessageType = {
        sender: "bot",
        text: "Something went wrong. Try again!",
        reference: "",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#dbdbfc18] backdrop-blur-sm w-full max-w-4xl h-[97%] shadow-lg rounded-lg flex flex-col">
      <div className="flex-grow p-6 overflow-y-auto space-y-4 ">
        <div className="flex items-center justify-center">
          <img
            src={darthMaul}
            alt="storm_trooper"
            className="w-10 h-10 object-center mr-2"
          />

          <h1 className="text-2xl font-bold text-center text-white">
            Padwan, ready to explore the repository far, far away?
          </h1>
          <img
            src={blueLightSaber}
            alt="lightsaber"
            className="w-10 h-10 object-center ml-1"
          />
        </div>

        <div className="text-white">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>

        {messages.map((msg) => (
          <Message
            sender={msg.sender}
            text={msg.text}
            reference={msg.reference}
          />
        ))}
        {isLoading && (
          <div className="flex items-center">
            <img
              src={stormTrooper}
              alt="storm_trooper"
              className="w-10 h-10 object-center mr-2"
            />
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
