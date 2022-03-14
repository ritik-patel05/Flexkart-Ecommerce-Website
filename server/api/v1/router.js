import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  req.container.resolve("loginApi").handleRequest(req, res);
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const payload = {
      id: req.user.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        const jwt = `Bearer ${token}`;

        const htmlWithEmbeddedJWT = `
        <html>
        <script>
            // Save JWT to localStorage
            window.localStorage.setItem('token', '${jwt}');
            // Redirect browser to root of application
            window.location.href = '/auth/success';
        </script>
        </html>
        `;

        res.send(htmlWithEmbeddedJWT);
      }
    );
  }
);

export default router;
