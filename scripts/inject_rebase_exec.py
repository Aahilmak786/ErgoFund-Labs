"""Git sequence editor: after each `pick`, run rebase_amend_footer.py on that commit."""
import os
import sys


def main() -> None:
    path = sys.argv[1]
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    amend = os.path.join(repo_root, 'scripts', 'rebase_amend_footer.py')
    py = sys.executable
    lines = open(path, encoding='utf-8').read().splitlines(True)
    out: list[str] = []
    for line in lines:
        out.append(line)
        if line.startswith('pick '):
            # Quote paths for Windows (spaces-safe)
            out.append(f'exec "{py}" "{amend}"\n')
    open(path, 'w', encoding='utf-8').writelines(out)


if __name__ == '__main__':
    main()
