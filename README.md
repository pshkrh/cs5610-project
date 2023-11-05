# **Waste Deal**

# Members:

- Pushkar Kurhekar
- Ayman Ahmad
- Shubh Desai
- Dhruv Patel

# Project Summary

**Problem Statement**: In this modernize era, the primary problem of majority of people is to go to the scrap shops or scrap collectors in order to sell their scrap/waste. It sometimes cost arms and legs to the person as they have to first find scrap shop or collector which can buy scrap or waste. On the other hand collectors also need to someone who is willing to sell their scrap or waste in order to maintian their respective economical cycle.

**Abstract**: Developing a web application that can enhance the conventional waste dealings by implementing one stop secured portal for garbage collectors and business owners, with waste classifier, timely pickup mechanism and providing appropriate waste rates. Using WasteDeal, one can classify paper waste, metal waste, plastic waste and other obsolete things. On top of that, it will also **help** various **waste collectors** who are continuously looking for profitable deals to buy scraps.

**Approach**: We plan to design and develop an interactive web application which will have three main modules namely, User module, Garbage Collector module and admin module such that, Users can make a pick-up requests with some necessary details such as scrap type, weight, address and etc. Those requests directly forward to the garbage collectors for their respective region. Based on provided details collectors can collect the waste and give the money to the users. Then admin can directly deal with the garbage collectors. We will utilize HTML, CSS, JavaScript, ReactJS and Redux for designing interactive user-interface, for the backend we've decided to use Node.js and for database we'll use MongoDB database. After developing the web application we'll deploye it to the AWS cloud.

**Technology stack**: HTML, CSS, JavaScript, ReactJS, Node.js, Redux, MongoDB, JWT, AWS (EC2 instance)

**Persona** :There are three primary personas of the portal.

- **Users**: The people who are willing to sell their waste/scrap/garbage to the collectors.
- **Collectors**: The people who collects the waste from the users and report it to the admin/owner. In other words, collectors are the mediator between users and the admin/owner.
- **Admins/Owners**: The people who owns the portal. The owner is deal with waste collectors.

# Architecture Diagram

<img src = "FINAL_architecture diagram.drawio.png" />

# Demo Link

https://drive.google.com/file/d/1q8AtUXwlx0xchP6naNVwOgk7jqi-97mY/view?usp=sharing

# Diagrams

## Entity Relationship Diagram

![er diagrams](https://user-images.githubusercontent.com/75003630/168188599-8dda5788-29e0-4dd1-8899-533e220b6006.jpg)

## Activity Diagrams

### User Activity Diagram

![Customer Activity Diagram](https://user-images.githubusercontent.com/75003630/168188516-8023dc91-9878-449d-8817-03210972f116.png)

### Collector Activity Diagram

![Scrap Collector Activity Diagram](https://user-images.githubusercontent.com/75003630/168188799-1a7e778d-736d-4952-9034-a3b761d401aa.png)

### Admin Activity Diagram

![Admin Activity Diagram](https://user-images.githubusercontent.com/75003630/168188396-7ea9f376-8298-4b19-b7f1-4da63e869b45.jpg)

## Sequence Diagrams

### Customer Sequence Diagram

![Customer Sequence Diagram](https://user-images.githubusercontent.com/75003630/168188535-11a4724f-222c-4ee1-8130-a1465ade5f75.jpg)

### Collector Sequence Diagram

![collector Sequence Diagram](https://user-images.githubusercontent.com/75003630/168188552-de2fdb66-e4c1-409c-b2a8-4cac10b76dfc.jpg)

### Amdin Sequence Diagram

![amdin Sequence Diagram](https://user-images.githubusercontent.com/75003630/168188571-a4656aa7-55ac-4919-bf80-2ad72f6fcae5.jpg)
