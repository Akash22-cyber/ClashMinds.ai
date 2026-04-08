package routes

import (
	"clashminds/controllers"

	"github.com/gin-gonic/gin"
)

func GetLeaderboardRouteHandler(c *gin.Context) {
	controllers.GetLeaderboard(c)
}
