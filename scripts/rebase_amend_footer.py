"""During rebase exec: drop Made-with: Cursor; add Made by Aahil / ReApY-raccoon; fix Athrava author."""
import os
import subprocess
import tempfile


def run_git(args: list[str]) -> str:
    r = subprocess.run(['git', *args], capture_output=True, text=True, check=True)
    return r.stdout


def main() -> None:
    os.chdir(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
    ae = run_git(['log', '-1', '--format=%ae']).strip()
    raw = run_git(['log', '-1', '--format=%B'])
    lines = [ln for ln in raw.splitlines() if ln != 'Made-with: Cursor']
    while lines and not lines[-1].strip():
        lines.pop()
    body = '\n'.join(lines).rstrip()

    if ae == 'Aahilmak786@users.noreply.github.com':
        footer = 'Made by Aahil'
    elif ae in ('athrava@users.noreply.github.com', 'ReApY-raccoon@users.noreply.github.com'):
        footer = 'Made by ReApY-raccoon'
    else:
        footer = None

    new_msg = (body + '\n\n' + footer + '\n') if footer else (body + '\n')

    with tempfile.NamedTemporaryFile(
        'w', suffix='.msg', delete=False, encoding='utf-8', newline='\n'
    ) as f:
        f.write(new_msg)
        msg_path = f.name

    try:
        cmd = ['git', 'commit', '--amend', '-F', msg_path]
        if ae == 'athrava@users.noreply.github.com':
            cmd.extend(
                ['--author=ReApY-raccoon <ReApY-raccoon@users.noreply.github.com>']
            )
        subprocess.run(cmd, check=True)
    finally:
        try:
            os.unlink(msg_path)
        except OSError:
            pass


if __name__ == '__main__':
    main()
