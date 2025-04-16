# Todo Application Ansible Deployment

This directory contains the Ansible playbooks and configuration files needed to deploy the Todo application.

## Structure

- `deploy.yml`: Main playbook for deploying the application
- `tasks/`: Task definitions separated by function
- `templates/`: Jinja2 templates for configuration files
- `group_vars/`: Variable definitions
- `inventories/`: Inventory files
- `handlers.yml`: Handler definitions

## Usage

Run the playbook with:

```bash
ansible-playbook -i inventories/hosts deploy.yml