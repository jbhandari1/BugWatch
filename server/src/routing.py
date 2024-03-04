#!/usr/bin/env python
# Module handling routing of requests from Flask app

from flask import current_app as app
from flask import request

from src.modules.users import check_user_credentials, create_user
from src.modules.issues import return_issues, return_ind_issue, create_issue, change_property


def _check_user(username: str, password: str) -> str: # /api/login/
    """
    GET
    Checks if a user can login, returns admin level or false
    URL params username, password
    """
    return {"valid": str(check_user_credentials(username, password))}


def _create_user() -> str: 
    """
    POST
    Creates a user
    Body {username, password, admin_level}
    """
    body: dict = request.json
    username: str = body['username']
    password: str = body['password']
    admin_level: str = body['admin_level'] # Either "user" or "admin"
    return str(create_user(username, password, admin_level))


def _create_issue() -> str:
    """
    POST
    Creates an issue
    Body {title, info}
    """
    body: dict = request.json
    title: str = body['title']
    info: str = body['info']
    priority: str = body['priority']
    tags: str = body['tags']
    return create_issue(title, info, priority, tags)


def _edit_issue() -> str:
    """
    POST
    Edits an issue
    Body {issue_id, prop, new_val}
    """
    body: dict = request.json
    issue_id: str = body['issue_id']
    prop: str = body['prop']
    new_val: str = body['new_val']
    return change_property(issue_id, prop, new_val)


def _read_issues() -> dict:
    """
    GET
    Reads and returns a dictionary of active issues and archived issues
    """
    return return_issues()

def _read_ind_issue(id) -> dict:
    """
    GET
    Reads and returns a dictionary of an issue given id
    URL param issue_id
    """
    return return_ind_issue(id)


routes: dict = {
    "/api/user/login/<username>/<password>": [_check_user, 'GET'],
    "/api/user/create": [_create_user, 'POST'],
    "/api/issue/get_all": [_read_issues, 'GET'],
    "/api/issue/get_ind/<id>": [_read_ind_issue, 'GET'],
    "/api/issue/create": [_create_issue, 'POST'],
    "/api/issue/edit": [_edit_issue, 'POST']
}


def create_routes():
    """
    Create url rules and add to app
    """
    gets_text: str = "<b>GET METHODS</b>\n"
    posts_test: str = "<b>POST METHODS</b>\n"

    for name, value in routes.items():
        if value[1] == 'GET':
            gets_text += (name + "\n")
        else:
            posts_test += (name + "\n")

    final_text: str = gets_text + "\n\n" + posts_test
    for page_name in routes:
        with app.app_context():
            @app.errorhandler(404)
            def _error_endpoint(error) -> str:
                return f"{error}\n\n{final_text}"
            app.add_url_rule(page_name, view_func=routes[page_name][0], methods=[routes[page_name][1]])