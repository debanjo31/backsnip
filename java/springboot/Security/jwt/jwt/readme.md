---

# JwtService

## Overview

The `JwtService` class is a comprehensive utility for managing JSON Web Tokens (JWT) in a Spring-based application. It
provides essential functionalities for generating, validating, and extracting claims from JWTs, which are often used to
secure RESTful APIs by ensuring that only authenticated users can access protected resources.

This service is designed to seamlessly integrate with Spring Security, making it easier to handle authentication and
authorization in a secure and standardized way.

## Features

- **Token Generation:** Create JWTs with customizable claims and expiration times.
- **Token Validation:** Verify the authenticity of JWTs and check if they have expired.
- **Claims Extraction:** Retrieve specific claims such as username (subject) and expiration date from JWTs.
- **Support for Authorities:** Include user roles and permissions as claims within the JWT.

## Installation

To use the `JwtService` class in your Spring Boot project, follow these steps:

1. **Add Dependencies:** Ensure you have the necessary dependencies in your `pom.xml` (for Maven) or `build.gradle` (for
   Gradle). You will need `jjwt` for JWT handling and Spring Security for user management.

   ```xml
   	<dependencies>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-api</artifactId>
			<version>0.11.5</version>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-impl</artifactId>
			<version>0.11.5</version>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-jackson</artifactId>
			<version>0.11.5</version>
		</dependency>
	</dependencies>
   ```

2. **Configuration:** Ensure your `application.properties` or `application.yml` includes the necessary JWT
   configuration:

   ```properties
   jwt-expiration=3600000
   jwt.secret-key=your-secret-key-in-base64-format
   ```

Note: Check `application.properties` in this repo for the `jwt-expiration` and `jwt.secret-key` used in the class

## Usage

### 1. Extracting the Username from a Token

You can easily extract the username (subject) from a JWT token:

```java
String username = jwtService.extractUserName(token);
```

### 2. Generating a JWT Token

Generate a JWT token for a user, optionally including additional claims:

```java
String token = jwtService.generateToken(userDetails);
```

You can also include extra claims like so:

```java
Map<String, Object> claims = new HashMap<>();
claims.

put("customClaim","value");

String token = jwtService.generateToken(claims, userDetails);
```

### 3. Validating a JWT Token

To validate a token, ensuring it matches the expected username and is not expired:

```java
boolean isValid = jwtService.isTokenValid(token, userDetails);
```

### 4. Extracting Other Claims

You can extract any claim from the token using the `extractClaim` method:

```java
Date expirationDate = jwtService.extractClaim(token, Claims::getExpiration);
```

## How It Works

### Key Components:

- **Claims Extraction:** The `extractClaim` method allows you to extract specific claims from the JWT by applying a
  function (e.g., `Claims::getSubject` for the username).
- **Token Building:** The `buildJwtToken` method constructs a JWT using the provided claims, user details, and
  expiration time. It includes critical information such as the subject (username), issue date, and expiration date.
- **Token Signing:** The JWT is signed with a secret key, which is decoded from Base64 format using the `key()` method.
  This signature is essential for verifying the token's integrity.
- **Token Validation:** The `isTokenValid` method ensures that the token belongs to the expected user and that it hasn't
  expired.

### Example Flow:

1. **Generate Token:** When a user logs in, a token is generated using their details (username, roles).
2. **Send Token:** This token is sent to the client, who stores it (typically in local storage or cookies).
3. **Validate Token:** On subsequent requests, the client sends the token. The server validates it to ensure the request
   is authorized.
