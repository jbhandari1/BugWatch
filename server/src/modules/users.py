from src.modules.objects.user import User
from src.modules.persistence import users

levels: dict = {
    "admin": 2,
    "user": 1
}

def _setup_users() -> None:
    """
    Sets up module with dummy data
    """
    create_user("test_admin", "test_password", "admin")
    create_user("test_user", "test_password", "user")

def create_user(username: str, password: str, level: str) -> list:
    """
    Creates user from inputs
    @return[list]   Returns status of user creation in format [created, status](bool, str)
    """
    if not levels.get(level):
        return [False, "Error, invalid level status"]
    for user in users:
        if user.username == username:
            return [False, "Error, user already exists"]

    new_user: User = User()
    new_user.level = levels.get(level)
    new_user.username = username
    new_user.password = password

    users.append(new_user)
    return [True, "Successfully created user"]

def check_user_credentials(username: str, password: str) -> int:
    """
    Checks if a user login is valid and returns admin level
    @return[int]    Returns admin level of user if valid credentials, else False
    """
    for user in users:
        admin_level: int = user.get_admin_level(username, password)
        if admin_level is not None:
            return admin_level
    return False

_setup_users()