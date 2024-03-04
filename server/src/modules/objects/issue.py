import time


class Issue(object):
    def obj_to_dict(self) -> dict:
        """
        Converts the object to a dictionary with all info
        @return[dict]   Dictionary with object info
        """
        return {
            "title": self.title,
            "info": self.info,
            "timestamp": self.timestamp,
            "tags": self.tags,
            "priority": self.priority,
            "archived": self.archived,
            "id": self.id
        }


    def update_from_db(self, input_dict) -> None:
        """
        Updates self object with inputted dictionary
        """
        self.timestamp = input_dict['timestamp']
        self.id = input_dict['id']
        self.title = input_dict['title']
        self.info = input_dict['info']
        self.priority = int(input_dict['priority'])
        self.tags = input_dict['tags']
        self.archived = bool(input_dict['archived'])


    def __init__(self, id) -> None:
        self.timestamp = time.time()
        self.id = id
        self.title: str = None
        self.info: str = None
        self.priority: int = None
        self.tags: list = []
        self.archived: bool = False