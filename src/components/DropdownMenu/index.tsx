import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'





interface DropdownMenuProps {
  navItems: Array<{
    label: string
    url?: string
    subItems?: Array<{ label: string; url: string }>
  }>
}

export const DropdownMenuDemo: React.FC<DropdownMenuProps> = ({ navItems }) => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        {navItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {item.subItems.map((subItem, subIndex) => (
                    <DropdownMenuItem key={subIndex}>
                      <a href={subItem.url}>{subItem.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem>
                <a href={item.url}>{item.label}</a>
              </DropdownMenuItem>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
