# GitHub SSH Setup Guide

Your repository is already configured with the correct remote URL:
- **Remote URL**: `git@github.com:David2020525/musical.git`

However, you need to set up SSH keys to authenticate with GitHub. Follow these steps:

## Step 1: Generate an SSH Key

Open PowerShell or Git Bash and run:

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

**Note**: Replace `your_email@example.com` with your GitHub email address.

- Press Enter to accept the default file location (`C:\Users\Tiger\.ssh\id_ed25519`)
- Optionally, enter a passphrase for extra security (or press Enter to skip)

## Step 2: Start the SSH Agent

```powershell
# Start the ssh-agent service
Start-Service ssh-agent

# Add your SSH key to the agent
ssh-add ~\.ssh\id_ed25519
```

## Step 3: Copy Your Public Key

Display your public key:

```powershell
Get-Content ~\.ssh\id_ed25519.pub
```

**Copy the entire output** (it should start with `ssh-ed25519` and end with your email).

## Step 4: Add SSH Key to GitHub

1. Go to GitHub.com and sign in
2. Click your profile picture → **Settings**
3. In the left sidebar, click **SSH and GPG keys**
4. Click **New SSH key**
5. Give it a title (e.g., "My Windows PC")
6. Paste your public key into the "Key" field
7. Click **Add SSH key**

## Step 5: Test the Connection

Test your SSH connection to GitHub:

```powershell
ssh -T git@github.com
```

You should see a message like:
```
Hi David2020525! You've successfully authenticated, but GitHub does not provide shell access.
```

## Step 6: Verify Your Repository Connection

Once SSH is set up, test your repository connection:

```powershell
cd C:\Users\Tiger\Desktop\musical\musical
git fetch origin
```

If successful, you're all set! You can now:
- `git pull` to get updates
- `git push` to upload changes
- `git fetch` to check for updates

## Alternative: Use HTTPS Instead

If you prefer not to use SSH, you can switch to HTTPS:

```powershell
cd C:\Users\Tiger\Desktop\musical\musical
git remote set-url origin https://github.com/David2020525/musical.git
```

Then you'll use your GitHub username and a Personal Access Token (instead of password) when pushing.

---

**Need Help?**
- GitHub SSH documentation: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Troubleshooting: https://docs.github.com/en/authentication/troubleshooting-ssh
