import random
import string

def generate_password(length=12, use_digits=True, use_special_chars=True):
    # Define character sets for password generation
    lowercase_letters = string.ascii_lowercase
    uppercase_letters = string.ascii_uppercase
    digits = string.digits if use_digits else ""
    special_characters = "!@#$%^&*()_-+=<>?"

    # Combine character sets based on complexity options
    characters = lowercase_letters + uppercase_letters
    if use_digits:
        characters += digits
    if use_special_chars:
        characters += special_characters

    # Check if any character sets are selected
    if not characters:
        return "Invalid complexity settings"

    # Generate the password
    password = "".join(random.choice(characters) for _ in range(length))
    return password

if __name__ == "__main__":
    print("Password Generator")
    length = int(input("Enter password length: "))
    use_digits = input("Include digits (y/n)? ").lower() == "y"
    use_special_chars = input("Include special characters (y/n)? ").lower() == "y"

    password = generate_password(length, use_digits, use_special_chars)
    print("Generated Password:", password)

