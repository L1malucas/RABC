# Clinic RBAC Management System

## Prerequisites

- Node.js (v16+ recommended)
- Angular CLI

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Run `ng serve`
4. Open `http://localhost:4200`

## Project Structure

- `src/app/core/`: Core services and interceptors
- `src/app/shared/`: Shared components and models
- `src/app/profiles/`: Role-specific profile components
- `src/app/forms/`: Form components
- `src/app/admin/`: Admin management components

## Authentication

- Roles: Doctor, Nurse, Psychologist, Admin
- Mock login with predefined roles
- RBAC implemented via AuthService

## Features

- Custom role-based button components
- Patient registration form
- User management for admins
- Role-based access control

## Development

- Uses Angular Standalone Components
- Implements signals for state management
- Reactive forms for validation
- TypeScript with strict typing

## Testing

Run `ng test` to execute unit tests
Run `ng e2e` to run end-to-end tests
