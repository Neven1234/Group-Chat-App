using GroupChatApi.Models;
using Microsoft.AspNetCore.SignalR;

namespace GroupChatApi.Hub
{
    public class ChatHub:Microsoft.AspNetCore.SignalR.Hub
    {
        private readonly IDictionary<string,UserRoomConnection> _connections;
        public ChatHub(IDictionary<string, UserRoomConnection> connections)
        {
            _connections = connections;
        }
        public async Task JoinRoom(UserRoomConnection userRoomConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userRoomConnection.Room!);
            _connections[Context.ConnectionId]=userRoomConnection;
            await Clients.Group(userRoomConnection.Room!)
                .SendAsync("ReciveMessage","lets program bot",$"{userRoomConnection.User} has joined the group", DateTime.Now);
          await  SendConnectedUser(userRoomConnection.Room!);        
        }
        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId,out UserRoomConnection userRoomConnection))
            {
                await Clients.Group(userRoomConnection.Room!)
                    .SendAsync("ReciveMessage",userRoomConnection.User,message,DateTime.Now);
            }
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if(!_connections.TryGetValue(Context.ConnectionId,out UserRoomConnection userRoomConnection))
            {
                return base.OnDisconnectedAsync(exception);
            }
            _connections.Remove(Context.ConnectionId);
            Clients.Group(userRoomConnection.Room!)
                .SendAsync("ReciveMessage", "lets Programe bot", $"{userRoomConnection.User} has left the group", DateTime.Now);
            SendConnectedUser(userRoomConnection.Room!);
            return base.OnDisconnectedAsync(exception);
        }
        public  Task SendConnectedUser(string room)
        {
            var users = _connections.Values
                .Where(x => x.Room == room)
                .Select(x => x.User);
            return Clients.Group(room).SendAsync("connected users", users);
        }
    }
}
