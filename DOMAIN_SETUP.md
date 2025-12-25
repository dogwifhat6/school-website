# How to Connect a Custom Domain to Vercel

## Step 1: Purchase a Domain (if you don't have one)

### Recommended: Namecheap (Cheap .com domains)
1. Go to [namecheap.com](https://www.namecheap.com)
2. Search for your desired domain name
3. Add to cart and checkout (often $0.98-$1.48 for first year)
4. Complete the purchase

### Alternative: Cloudflare Registrar (Transparent pricing)
1. Go to [cloudflare.com](https://www.cloudflare.com/products/registrar/)
2. Search and register your domain
3. Pay only the wholesale cost (~$9.77/year for .com)

---

## Step 2: Add Domain to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Log in and select your school-website project

2. **Navigate to Domain Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click **Domains** in the left sidebar

3. **Add Your Domain**
   - Click **Add Domain** button
   - Enter your domain (e.g., `swastikhighschool.com`)
   - Click **Add**

4. **Vercel will show DNS configuration**
   - You'll see DNS records that need to be added
   - Usually something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

---

## Step 3: Configure DNS at Your Domain Registrar

### If using Namecheap:

1. **Log in to Namecheap**
   - Go to [namecheap.com](https://www.namecheap.com) and log in
   - Go to **Domain List** → Click **Manage** next to your domain

2. **Go to Advanced DNS**
   - Click **Advanced DNS** tab

3. **Add DNS Records**
   - Delete any existing A records for `@`
   - Add new A record:
     - **Type**: A Record
     - **Host**: @
     - **Value**: `76.76.21.21` (or the IP Vercel provides)
     - **TTL**: Automatic
   
   - Add CNAME record for www:
     - **Type**: CNAME Record
     - **Host**: www
     - **Value**: `cname.vercel-dns.com` (or what Vercel shows)
     - **TTL**: Automatic

4. **Save Changes**

### If using Cloudflare:

1. **Add Domain to Cloudflare**
   - Log in to Cloudflare
   - Click **Add a Site**
   - Enter your domain
   - Follow the setup wizard

2. **Update Nameservers**
   - Cloudflare will provide nameservers
   - Update these at your domain registrar

3. **Configure DNS in Cloudflare**
   - Go to **DNS** → **Records**
   - Add the A and CNAME records Vercel provided

---

## Step 4: Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually takes **15-30 minutes** for most cases
- Vercel will automatically detect when DNS is configured correctly

---

## Step 5: Verify Domain in Vercel

1. **Check Domain Status**
   - Go back to Vercel → Your Project → Settings → Domains
   - You should see your domain listed
   - Status will change from "Pending" to "Valid Configuration"

2. **Test Your Domain**
   - Visit `https://yourdomain.com`
   - Your website should load!

---

## Troubleshooting

### Domain not working after 24 hours?
- Double-check DNS records match exactly what Vercel shows
- Use [whatsmydns.net](https://www.whatsmydns.net) to check DNS propagation
- Ensure you're using the correct IP addresses from Vercel

### SSL Certificate Issues?
- Vercel automatically provides SSL certificates via Let's Encrypt
- Wait 5-10 minutes after DNS is configured for SSL to activate

### www vs non-www?
- Vercel can handle both automatically
- Add both `yourdomain.com` and `www.yourdomain.com` in Vercel settings
- Vercel will redirect one to the other

---

## Free Domain Alternatives (Not .com)

If you want a completely free domain:

### Freenom (Free .tk, .ml, .ga, .cf, .gq)
1. Go to [freenom.com](https://www.freenom.com)
2. Search for available domain
3. Register for free
4. Follow same DNS setup steps above

**Note**: Free domains may have limitations and are less professional.

---

## Best Practices

1. **Use a reputable registrar** (Namecheap, Cloudflare, Google Domains)
2. **Enable auto-renewal** to avoid losing your domain
3. **Keep your contact information updated**
4. **Use strong passwords** for your domain account
5. **Enable 2FA** if available

---

## Cost Summary

- **Cheapest .com**: ~$1/year (first year), then ~$10-15/year
- **Cloudflare .com**: ~$9.77/year (consistent pricing)
- **Free alternatives**: $0/year (but less professional)

For a school website, investing $10-15/year for a professional .com domain is highly recommended!

