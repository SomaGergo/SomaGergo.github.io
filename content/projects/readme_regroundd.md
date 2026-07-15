# ReGround

ReGround is a mobile wellbeing app designed to help people reduce screen time, interrupt compulsive scrolling, and build healthier phone habits through small real-world actions.

Instead of relying only on timers and restrictions, the product combines app blocking with short offline missions and a tree-growth reward system that makes time away from the screen feel visible and motivating.

## Product Vision

The idea behind ReGround is simple: make digital boundaries feel supportive rather than punitive.

Users choose the apps or categories that distract them most, set personal limits, and then receive a more intentional interruption when they hit those boundaries. The app encourages them to step away from the screen, complete a short mission, and return with more awareness of how they are spending their time.

## Core Experience

- select distracting apps, categories, or websites
- set daily limits for digital use
- trigger interruption flows when limits are reached
- complete short offline missions instead of reflexively reopening apps
- earn progress through a growing tree and a lightweight reward system

The mission system is designed around quick, realistic actions that can break autopilot behavior in one to five minutes, making the experience accessible for everyday use rather than idealized self-improvement routines.

## Technical Highlights

ReGround is an iOS-first product built with a hybrid stack that combines cross-platform application development with native Apple Screen Time capabilities.

### Stack

- Expo and React Native
- TypeScript
- Swift
- Firebase Auth and Firestore
- RevenueCat for subscription handling
- Native iOS Screen Time frameworks:
  - FamilyControls
  - DeviceActivity
  - ManagedSettings

## Native iOS Functionality

One of the most important parts of the project is that the blocking flow is not a mockup or prototype-only concept. ReGround includes real native Screen Time integration with dedicated iOS extension targets for monitoring and shield behavior.

That means the project goes beyond interface design and includes production-style platform work such as:

- requesting Screen Time authorization
- presenting Apple’s app/category picker
- starting and stopping monitoring sessions
- applying custom block screens when limits are reached
- handling edge cases introduced by newer iOS versions

## Current Product Scope

The app currently includes:

- onboarding flow with user goals and screen-time baseline questions
- authentication with Apple and Google sign-in
- blocking and limit management
- interrupt flow for break-taking
- garden/tree progression system
- settings and profile flows
- Pro subscription structure for expanded protection options

## Why It Stands Out

Many screen-time tools focus only on restriction. ReGround takes a more human-centered approach by pairing friction with encouragement. The product is designed to help people pause, reflect, and choose a healthier next action, while still requiring strong technical work under the hood to make blocking reliable on iOS.

## What This Project Shows

This project demonstrates the ability to:

- turn a behavioral product idea into a cohesive mobile experience
- combine React Native product development with native iOS integrations
- design around real platform constraints instead of idealized prototypes
- build a more engaging wellbeing product through gamification and habit design
