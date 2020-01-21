require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context "can save" do
      it "content is full, image is null" do
        @message = build(:message)
        expect(build(:message, image: nil)).to be_valid
      end

      it "content is NULL, image is full" do
        expect(build(:message, content: nil)).to be_valid
      end

      it "content and image are full" do
        expect(build(:message)).to be_valid
      end
    end

    context "can't save" do
      it "content, image are null" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "group_id is null" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "user_id is null" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
      
    end
  end

end