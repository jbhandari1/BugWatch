from src.modules.objects.issue import Issue
from src.modules.persistence import issues


def _return_issue_from_id(issue_id: str) -> Issue:
    """
    Returns an issue from a string ID
    @param id[str]  ID in string form of requested issue
    @return[issue]  Returns issue object if found, else None
    """
    for issue in issues:
        if issue.id == int(issue_id):
            return issue
    return None


def change_property(issue_id: str, prop: str, new_val: str) -> dict:
    """
    Changes property of issue given ID
    @param issue_id[str]    ID of requested issue
    @param prop[str]        Property to change
    @param new_val[str]     New value of property
    @return[dict]           Dictionary of updated issue
    """
    issue: Issue = _return_issue_from_id(issue_id)
    if prop == "title":
        issue.title = new_val
    elif prop == "info":
        issue.info = new_val
    elif prop == "archive":
        issue.archived = (new_val == 'True')
    elif prop == "priority":
        print(new_val)
        issue.priority = int(new_val)
    return issue.obj_to_dict()


def add_tag(issue_id: str, tag: str) -> dict:
    """
    Adds tag from issue given ID
    @param issue_id[str]    ID of requested issue
    @param tag[str]         Tag to add to issue
    @return[dict]           Dictionary of updated issue
    """
    issue: Issue = _return_issue_from_id(issue_id)
    issue.tags.append(tag)
    return issue.obj_to_dict()


def remove_tag(issue_id: str, tag: str) -> dict:
    """
    Removes tag from issue given ID
    @param issue_id[str]    ID of requested issue
    @param tag[str]         Tag to remove from issue
    @return[dict]           Dictionary of updated issue
    """
    issue: Issue = _return_issue_from_id(issue_id)
    issue.tags.remove(tag)
    return issue.issobj_to_dictue_obj()


def create_issue(title: str, info: str, priority: str, tags: list) -> list:
    """
    Creates an issue from title and info
    @param title[str]   Title of new issue
    @param info[str]    Info/description of new issue
    @return[list]       Returns list as [New issue ID, dictionary of new issue]
    """
    issue: Issue = Issue(len(issues))
    issue.title = title
    issue.info = info

    if priority == "Normal":
        issue.priority = 3
    elif priority == "Moderate":
        issue.priority = 2
    elif priority == "Severe":
        issue.priority = 1

    issue.tags = tags
    issues.append(issue)
    return [issue.id, issue.obj_to_dict()]

def return_ind_issue(id: str) -> dict:
    issue = _return_issue_from_id(id)
    if issue is not None:
        return(issue.obj_to_dict())
    return None

def return_issues() -> dict:
    """
    Returns all issues as dictionary
    @return[dict]       Dictionary of all issues organized with {active, archived} issues
    """
    active_issues: list = []
    archived_issues: list = []
    for issue in issues:
        if issue.archived is False:
            active_issues.append(issue.obj_to_dict())
        else:
            archived_issues.append(issue.obj_to_dict())
    
    return{
        "active": active_issues, 
        "archived": archived_issues
    }


#create_issue("wooo", "weee")