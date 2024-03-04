from enum import IntEnum


class AdminLevel(IntEnum):
    """
    Admin level, either 1 for user, 2 for admin
    """
    USER = 1
    ADMIN = 2


class User(object):
    def obj_to_dict(self) -> dict:
        """
        Converts the object to a dictionary with all info
        @return[dict]   Dictionary with object info
        """
        return {
            "level": self.level,
            "username": self.username,
            "password": self.password
        }


    def get_admin_level(self, username, password) -> int:
        """
        Checks if the object matches a given username and password
        @return[bool]   If object matches username and password  
        """
        if self.username != username:
            return None
        if self.password != password:
            return None
        return self.level
    

    def update_from_db(self, input_dict) -> None:
        """
        Updates self object with inputted dictionary
        """
        self.level = int(input_dict['level'])
        self.username = input_dict['username']
        self.password = input_dict['password']

    
    def __init__(self) -> None:
        self.level: int = None
        self.username: str = None
        self.password: str = None