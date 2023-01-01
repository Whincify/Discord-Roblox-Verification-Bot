local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")

local FirebaseService = require(script.FirebaseService)

local PendingFirebase = FirebaseService.new("pending")
local VerifiedFirebase = FirebaseService.new("verified")

Players.PlayerAdded:Connect(function(player)
	local userId = player.UserId
	local discordId = PendingFirebase:GetAsync(userId)
	
	if discordId then
		local success, err = pcall(function()
			VerifiedFirebase:SetAsync(discordId,HttpService:JSONEncode({["linked"] = userId,}))
		end)
		
		if success then
			PendingFirebase:RemoveAsync(userId)
			player:Kick("Accounts successfully linked. Please press next on the Discord prompt.")
		else
			player:Kick("Something went wrong, please rejoin and try again.")
		end
	else
		player:Kick("No pending verification requests found. If this is a mistake, restart the verification process.")
	end
end)
